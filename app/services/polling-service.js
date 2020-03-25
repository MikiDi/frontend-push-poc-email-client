import Service from '@ember/service';
import { A } from '@ember/array'
import ArrayProxy from '@ember/array/proxy';
import { inject as service } from '@ember/service';
import fetch from 'fetch'
import { task } from 'ember-concurrency';

export default class PollingServiceService extends Service {
  @service store;

  monitoredResources = null
  pollInterval = 1000;

  constructor () {
    super(...arguments);
    this.monitoredResources = A([]);
    this.lifecycle();
  }

  async findAll () {
    const monitoredResource = this.register(this.pollAll, arguments);
    const resource = await this.pollResource.perform(monitoredResource);
    return resource;
  }

  async pollAll (type) {
    const url = this.store.adapterFor(type).urlForFindAll(type);
    const response = await (await fetch(url)).json();
    this.store.pushPayload(type, response);

    const result = A([]);
    for (const entity of response.data) {
      const edEntity = this.store.peekRecord(type, entity.id);
      result.pushObject(edEntity);
    }
    return result;
  }

  register(pollingFunction, args) {
    return this.monitoredResources.pushObject({
      pollingFunction,
      args
    });
  }

  unregister (resource) {
    const r = this.monitoredResources.find('resource', resource);
    if (r) {
      this.monitoredResources.popObject(r);
    }
  }

  lifecycle () {
    for (const resource of this.monitoredResources) {
      this.pollResource.perform(resource);
    }
    window.setTimeout(this.lifecycle.bind(this), this.pollInterval);
  }

  @(task(function * (monitoredResource) {
    const resource = yield monitoredResource.pollingFunction.apply(this, monitoredResource.args);
    if (monitoredResource.resource) {
      monitoredResource.resource.set('content', resource);
    } else {
      monitoredResource.resource = ArrayProxy.create({ content: resource });
    }
    return monitoredResource.resource;
  }).maxConcurrency(1).enqueue()) pollResource;
}

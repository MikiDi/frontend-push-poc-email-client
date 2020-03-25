import fetch from 'fetch'

export default async function sendMail() {
  const payload = {
    type: 'emails',
    attributes: {
      from: 'mailto:michael.dierick@redpencil.io',
      to: 'mailto:info@redpencil.io',
      subject: 'New message!',
      'sent-date': (new Date()).toISOString()
    }
  };
  await fetch('/emails', {
    method: 'post',
    headers: {
      "Content-type": "application/vnd.api+json; charset=UTF-8"
    },
    body: JSON.stringify({ data: payload})
  });
}

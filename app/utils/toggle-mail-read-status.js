export default async function toggleMailReadStatus(mail) {
  const payload = {
    type: 'emails',
    id: mail.id,
    attributes: {
      'is-read': !mail.isRead,
    }
  };
  await fetch(`/emails/${mail.id}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/vnd.api+json; charset=UTF-8"
    },
    body: JSON.stringify({ data: payload})
  });
}

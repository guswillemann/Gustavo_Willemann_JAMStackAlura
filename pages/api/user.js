import HttpClient from '../../src/infra/http/HttpClient';

const url = 'https://instalura-api.vercel.app/api/users';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(501).json({ message: 'Utilize o método: POST' });
    return;
  }

  if (!req.body.id) {
    res.status(400).json({ error: 'Nenhum argumento enviado para pesquisa.' });
    return;
  }

  const users = await HttpClient(url, {})
    // eslint-disable-next-line no-underscore-dangle
    .then((response) => response.data.filter((user) => user._id === req.body.id));

  const responseJson = users.length === 0 ? { message: 'Nenhum usuário encontrado' } : users;
  res.status(200).json(responseJson);
}

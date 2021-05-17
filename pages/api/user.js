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

  const userData = await HttpClient(url, {})
    // eslint-disable-next-line no-underscore-dangle
    .then((response) => response.data.find((user) => user._id === req.body.id));
  const response = userData
    ? {
      username: userData.username,
      name: userData.name,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      avatar: 'https://picsum.photos/200', // placeholder
      followers: Math.floor(Math.random() * 1000000), // placeholder value
      following: Math.floor(Math.random() * 1000), // placeholder value
    }
    : { message: 'Nenhum usuário encontrado' };

  res.status(200).json(response);
}

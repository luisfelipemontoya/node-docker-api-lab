
import http from 'http'; 
import fs from 'fs/promises'; 

const PORT = process.env.PORT || 3000;

const readUsers = async () => {
  const data = await fs.readFile('./data/users.json', 'utf-8');
  return JSON.parse(data);
};

const saveUsers = async (users) => {
  await fs.writeFile(
    './data/users.json',
    JSON.stringify(users, null, 2)
  );
};

const readRequestBody = (req) => new Promise((resolve, reject) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    resolve(body);
  });

  req.on('error', (err) => {
    reject(err);
  });
});

const server = http.createServer(async (req, res) => {
  try {
    // HOME
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({
        message: 'Servidor funcionando 🚀',
      }));

      return;
    }

    // USERS
    if (req.url === '/users' && req.method === 'GET') {
      const users = await readUsers();

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify(users));

      return;
    }

    if (req.url === '/users' && req.method === 'POST') {
  const body = await readRequestBody(req);

  const newUser = JSON.parse(body);

  const users = await readUsers();

  const user = {
    id: users.length + 1,
    ...newUser,
  };

  users.push(user);

  await saveUsers(users);

  res.writeHead(201, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(user));

  return;
}

    // NOT FOUND
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({
      error: 'Route not found',
    }));

  } catch (err) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({
      error: 'Internal server error',
      message: err.message,
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// app.use(require('prerender-node').set('prerenderToken', 'Tnw2GnvnO4RqlcGNwQ6L'));

app.get('/', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.replace(/\$OG_TITLE/g, 'Digital Democracy');
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      'Дорогой Друг! Развитие демократии невозможно без системы сдержек и противовесов, не позволяющей всей полноте власти концентрироваться в одних руках и равномерно распределенной между государственными ветвями власти. С развитием средств связи к этой системе добавились СМИ, которые могли влиять на общественное мнение, но без обратной связи от населения. Интернет привнес интерактив в диалог между властью и народом. Осталось лишь формализовать и структурировать эти отношения и общество будет готово вступить в следующий этап развития политического строя - "Цифровую демократию". Добро пожаловать!'
    );
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/politician/:short_link/*', async function (request, response) {
  try {
    const fetchPolitician = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}getPolitician/${request.params.short_link}`
    );
    const { photo, name, position } = fetchPolitician.data.data;

    if (!photo && !name && !position) {
      console.log('error');
      return;
    }

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, name);
      data = data.replace(/\$OG_DESCRIPTION/g, position);
      result = data.replace(/\$OG_IMAGE/g, photo);
      response.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/elections/:link', async function (request, response) {
  try {
    const fetchElection = await axios.get(`${process.env.REACT_APP_BACKEND_API}getElection/${request.params.link}`);
    const { title, description } = fetchElection.data.data.election;

    if (!title && !description) {
      console.log('error');
      return;
    }

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, title);
      data = data.replace(/\$OG_DESCRIPTION/g, description ? description : 'Узнайте все о выборах');
      result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
      response.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/author/:link/*', async function (request, response) {
  try {
    const fetchAuthor = await axios.get(`${process.env.REACT_APP_BACKEND_API}author/${request.params.link}`);
    const { name, photo, description } = fetchAuthor.data.data;

    if (!name && !photo) {
      console.log('error');
      return;
    }

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, name);
      data = data.replace(/\$OG_DESCRIPTION/g, description ? description : 'Узнать новости автора');
      result = data.replace(/\$OG_IMAGE/g, photo);
      response.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/mass-media/:link/*', async function (request, response) {
  try {
    const fetchMassMedia = await axios.get(`${process.env.REACT_APP_BACKEND_API}media/${request.params.link}`);
    const { name, photo, description } = fetchMassMedia.data.data;

    if (!name && !photo && !description) {
      console.log('error');
      return;
    }

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, name);
      data = data.replace(/\$OG_DESCRIPTION/g, description);
      result = data.replace(/\$OG_IMAGE/g, photo);
      response.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/party/:short_link', async function (request, response) {
  try {
    const fetchParty = await axios.get(`${process.env.REACT_APP_BACKEND_API}party/${request.params.short_link}`);
    const { name, logo } = fetchParty.data.data;

    if (!name && !logo) {
      console.log('error');
      return;
    }

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, name);
      data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все о партиях');
      result = data.replace(/\$OG_IMAGE/g, logo);
      response.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/singleBills/*', function (request, response) {
  console.log('Party page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Законопроекты');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все о законопроектах');
    result = data.replace(/\$OG_IMAGE/g, 'https://dev-backoffice.digitaldemocracy.ru/storage/images/logo.png');
    response.send(result);
  });
});

app.get('/singleNews/:link', async function (request, response) {
  try {
    const fetchNews = await axios.get(`${process.env.REACT_APP_BACKEND_API}getNews/${request.params.link}`);
    const { title, image } = fetchNews.data.data.currentNews;

    if (!title && !image) {
      console.log('error');
      return;
    }

    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, title);
      data = data.replace(/\$OG_DESCRIPTION/g, 'Узнайте все важные новости');
      result = data.replace(/\$OG_IMAGE/g, image[0]);
      response.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

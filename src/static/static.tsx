import { useTranslation } from 'react-i18next';

export const sortMassMedia = (t) => {
  return [
    {
      id: 1,
      full_title: t('buttons.sort.dateFullTitle') || 'По дате',
      short_title: t('buttons.sort.dateShortTitle') || 'Дата',
      field: 'publication_date',
    },
    {
      id: 2,
      full_title: t('buttons.sort.popularityFullTitle') || 'По популярности',
      short_title: t('buttons.sort.popularityShortTitle') || 'Популярность',
      field: 'number_of_views',
    },
    {
      id: 3,
      full_title: t('buttons.sort.votesFullTitle') || 'По проголосовавшим',
      short_title: t('buttons.sort.votesShortTitle') || 'Голоса',
      field: 'votes',
    },
  ];
};

export const mockNews = [
  {
    id: 1,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 2,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 3,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 4,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 5,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 6,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 7,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 8,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 9,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 10,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
  {
    id: 11,
    media: {
      id: 1,
      name: 'Правда',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    author: {
      id: 5,
      title: 'Author',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl3E-Fv2bQ9m-B2lH34kQhXxIJFMDE7DXKg&usqp=CAU',
      percent: '20',
    },
    votes: 312,
    title: 'В Узбекистане вывели новый сорт чая В ррррУ збекистане вывели новый сорт чая ',
    publication_date: '12.02.2021',
    number_of_views: 400400,
    image:
      'https://i0.wp.com/murmanskcity.ru/wp-content/uploads/2021/06/v-zato-aleksandrovsk-otkljuchajut-otoplenie-i-vremenami-gorjachuju-vodu-6425692.jpg',
    short_link: 'short_link',
  },
];

export const sortParty = (t) => {
  return [
    {
      id: 1,
      full_title: t('buttons.sort.popularityFullTitle') || 'По популярности',
      short_title: t('buttons.sort.popularityShortTitle') || 'Популярность',
      field: 'news_count',
    },
    {
      id: 2,
      full_title: t('buttons.sort.ratingFullTitle') || 'По рейтингу',
      short_title: t('buttons.sort.ratingShortTitle') || 'Рейтинг',
      field: 'rating',
    },
  ];
};

export const sortRatingPoliticians = (t) => {
  return [
    {
      id: 1,
      full_title: t('buttons.sort.ratingFullTitle') || 'По рейтингу',
      short_title: t('buttons.sort.ratingShortTitle') || 'Рейтинг',
      field: 'rating',
    },
    {
      id: 2,
      full_title: t('buttons.sort.nameFullTitle') || 'По имени',
      short_title: t('buttons.sort.nameShortTitle') || 'Имя',
      field: 'name',
    },
  ];
};

export const sortDropdownPoliticians = (t) => [
  {
    id: 1,
    full_title: t('buttons.sort.geographyFullTitle') || 'Политики, по географии:',
    short_title: t('buttons.sort.geographyShortTitle') || 'География',
    field: 'geography',
  },
  {
    id: 2,
    full_title: t('buttons.sort.votesFullTitle') || 'Проголосовавшие, по географии',
    short_title: t('buttons.sort.votesShortTitle') || 'Проголосовавшие',
    field: 'vote',
  },
];

export const sortDropdownCountryVotes = (t) => [
  {
    id: 1,
    full_title: t('buttons.sort.geographyFullTitle') || 'Политики, по географии:',
    short_title: t('buttons.sort.geographyShortTitle') || 'География',
    field: 'geography',
  },
];

export const sortRatingAuthors = (t) => {
  return [
    {
      id: 1,
      full_title: t('buttons.sort.ratingFullTitle') || 'По рейтингу',
      short_title: t('buttons.sort.ratingShortTitle') || 'Рейтинг',
      field: 'rating',
    },
    {
      id: 2,
      full_title: t('buttons.sort.nameFullTitle') || 'По имени',
      short_title: t('buttons.sort.nameShortTitle') || 'Имя',
      field: 'name',
    },
  ];
};

export const sortRatingMedia = (t) => {
  return [
    {
      id: 1,
      full_title: t('buttons.sort.ratingFullTitle') || 'По рейтингу',
      short_title: t('buttons.sort.ratingShortTitle') || 'Рейтинг',
      field: 'rating',
    },
    {
      id: 2,
      full_title: t('buttons.sort.namedFullTitle') || 'По названию',
      short_title: t('buttons.sort.namedShortTitle') || 'Название',
      field: 'name',
    },
  ];
};

export const sortRatingParties = (t) => {
  return [
    {
      id: 1,
      full_title: t('buttons.sort.ratingFullTitle') || 'По рейтингу',
      short_title: t('buttons.sort.ratingShortTitle') || 'Рейтинг',
      field: 'rating',
    },
    {
      id: 2,
      full_title: t('buttons.sort.namedFullTitle') || 'По названию',
      short_title: t('buttons.sort.namedShortTitle') || 'Название',
      field: 'name',
    },
  ];
};

export const routesWithNotification = ['/singleNews/', '/politician/', '/mass-media/', '/author/', '/party/'];

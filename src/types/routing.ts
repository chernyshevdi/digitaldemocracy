import { useTranslation } from 'react-i18next';
import { AdditionalInformationMassMedia } from '../pages/MassMediaPage/tabs/additionalInformation/AdditionalInformation';
import { AdditionalInformationAuthor } from '../pages/AuthorPage/tabs/additionalInformation/AdditionalInformation';

import {
  IncomeStatistics,
  PoliticianBills,
  PoliticianNews,
  PositionDescription,
  PositionHistory,
  Promises,
  Quiz,
  RatingStatistics,
  Reception,
  AdditionalInformation,
} from '../pages/PoliticianPage/tabs';
import { Subscriptions, BrowsingHistory, DonationHistory, VotingStatistics, YourChoices } from '../pages/ProfilePage/tabs';

import { NewsBlock, MassMediaInfluenceStatistic } from '../pages/MassMediaPage/tabs';
import { AuthorNewsBlock, InfluenceStatistic } from '../pages/AuthorPage/tabs';
import SuggestionPage from '../pages/SuggestionPage/SuggestionPage';

export enum ModalParams {
  Auth = 'auth_modal',
  YandexRegister = 'yandex_user_data',
}

export enum AuthParam {
  login = 'login',
  register = 'register',
  reset_password = 'reset_password',
}

export const PoliticianTabs = (t) => {
  return [
    {
      id: 'politician_news',
      title: t('tabs.politicianNews') || 'Новости политика',
      component: PoliticianNews,
    },
    {
      id: 'politician_activity',
      title: t('tabs.politicianActivity') || 'Законодательная деятельность',
      component: PoliticianBills,
    },
    {
      id: 'position_history',
      title: t('tabs.positionHistory') || 'История должностей',
      component: PositionHistory,
    },
    {
      id: 'promises',
      title: t('tabs.promises') || 'Обещания и цитаты',
      component: Promises,
    },
    {
      id: 'income_statistics',
      title: t('tabs.statisticsIncome') || 'Статистика дохода',
      component: IncomeStatistics,
    },
    {
      id: 'rating_statistics',
      title: t('tabs.statisticsRating') || 'Статистика рейтинга',
      component: RatingStatistics,
    },
    {
      id: 'position_description',
      title: t('tabs.descriptionPosition') || 'Описание должности',
      component: PositionDescription,
    },
    {
      id: 'additional_information',
      title: t('tabs.additionalInformation') || 'Дополнительная информация',
      component: AdditionalInformation,
    },
    {
      id: 'reception',
      title: t('tabs.reception') || 'Виртуальная приёмная',
      component: Reception,
    },
    {
      id: 'quiz',
      title: t('tabs.quiz') || 'Опросы',
      component: Quiz,
    },
  ];
};

export const ProfileTabs = (t) => {
  return [
    {
      id: 'subscriptions',
      title: t('tabs.subscriptions') || 'Подписки',
      component: Subscriptions,
    },
    {
      id: 'voting_statistics',
      title: t('tabs.statisticsVoting') || 'Ваше досье на политиков',
      component: VotingStatistics,
    },
    {
      id: 'browsing_history',
      title: t('tabs.historyBrowsing') || 'История просмотров',
      component: BrowsingHistory,
    },
    {
      id: 'donation_history',
      title: t('tabs.historyDonation') || 'История донатов',
      component: DonationHistory,
    },
    {
      id: 'yourChoices',
      title: t('tabs.voice') || 'Ваши выборы',
      component: YourChoices,
    },
  ];
};

export const MassMediaTabs = (t) => {
  return [
    {
      id: 'news',
      title: t('tabs.news') || 'Новости',
      component: NewsBlock,
    },
    {
      id: 'statistic',
      title: t('tabs.statisticsInfluence') || 'Статистика влияния',
      component: MassMediaInfluenceStatistic,
    },
    {
      id: 'additional_information',
      title: t('tabs.additionalInformation') || 'Дополнительная информация',
      component: AdditionalInformationMassMedia,
    },
  ];
};

export const AuthorTabs = (t) => {
  return [
    {
      id: 'news',
      title: t('tabs.news') || 'Новости',
      component: AuthorNewsBlock,
    },
    {
      id: 'statistic',
      title: t('tabs.statisticsInfluence') || 'Статистика влияния',
      component: InfluenceStatistic,
    },
    {
      id: 'additional_information',
      title: t('tabs.additionalInformation') || 'Дополнительная информация',
      component: AdditionalInformationAuthor,
    },
  ];
};

export const RatingTabs = (t) => {
  return [
    {
      id: 'politicians',
      link: '/rating/politicians',
      title: t('tabs.politicians') || 'Политики',
    },
    {
      id: 'massMedia',
      link: '/rating/massMedia',
      title: t('tabs.massMedia') || 'СМИ',
    },
    {
      id: 'authors',
      link: '/rating/authors',
      title: t('tabs.authors') || 'Авторы',
    },
    {
      id: 'news',
      link: '/rating/parties',
      title: t('tabs.parties') || 'Партии',
    },
  ];
};

import './home/HomeSlider/HomeSlider.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@material-ui/core';
import { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'src/hooks/useSearchParams';
import { NewsTopicsI } from '../slices/homeSlice';
// import { useFetchHomePageData } from './home/hooks/useFetchHomePageData';

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      style={{
        position: 'absolute',
        zIndex: 90,
        backgroundColor: 'rgb(239, 239, 239)',
        left: -30,
        width: '35px',
        height: '35px',
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        border: '0px',
      }}
      onClick={onClick}
      type="button"
    >
      <NavigateBeforeIcon />
    </button>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      style={{
        position: 'absolute',
        zIndex: 90,
        backgroundColor: 'rgb(239, 239, 239)',
        right: -30,
        width: '35px',
        height: '35px',
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        border: '0px',
      }}
      onClick={onClick}
      type="button"
    >
      <NavigateNextIcon />
    </button>
  );
};

const useStyles = makeStyles((theme) => ({
  topic: {
    textAlign: 'center',
    width: '150px',
    maxWidth: '160px',
    cursor: 'pointer',
  },
  topicText: {
    fontWeight: 400,
    fontSize: 14,
    padding: '8px 8px',
    border: '1px solid #363557',
    borderRadius: '50px',
    color: '#363557',
    height: 40,
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  carouselContainer: {
    width: '80%',
    margin: 'auto',
  },
}));

const TopicsSlider = ({ newsTopics, fetch }) => {
  const { t, i18n } = useTranslation();
  const [resultNewsTopics, setResultNewsTopics] = useState([]);
  const {
    news_topic_id: { value: topicId, setValue: setTopicId },
  } = useSearchParams('news_topic_id');
  const handleNewsTopics = (id) => {
    fetch(1, id, true);
    setTopicId(id);
  };
  useEffect(() => {
    if (newsTopics && newsTopics.length !== 0) {
      setResultNewsTopics([{ id: -1, title: t('news.mainTitleList') }, ...newsTopics]);
    }
  }, [newsTopics, i18n.language]);
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    display: 'flex',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={classes.carouselContainer}>
      {resultNewsTopics && (
        <Slider
          {...settings}
          style={{
            width: '100%',
            display: 'flex',
          }}
        >
          {resultNewsTopics?.map((item) => (
            <Box
              className={classes.topic}
              sx={{
                borderRadius: '50px',
                backgroundColor: Number(topicId) === item.id ? '#363557 !important' : 'transparent',
              }}
              onClick={() => handleNewsTopics(item.id)}
              key={item.id}
            >
              <Typography
                className={classes.topicText}
                sx={{
                  color: Number(topicId) === item.id ? 'white!important' : 'black',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default TopicsSlider;

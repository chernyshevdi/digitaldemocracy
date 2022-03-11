import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      style={{
        position: 'absolute',
        zIndex: 90,
        backgroundColor: 'rgb(239, 239, 239)',
        left: 0,
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
  const { onClick } = props;
  return (
    <button
      style={{
        position: 'absolute',
        zIndex: 90,
        backgroundColor: 'rgb(239, 239, 239)',
        right: 0,
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
    whiteSpace: 'pre-wrap',
    margin: 0,
    [theme.breakpoints.up('xs')]: {
      maxWidth: '180px'
    }
  },
  topicText: {
    fontWeight: 400,
    fontSize: 14,
    padding: '8px 8px',
    border: '1px solid #363557',
    borderRadius: '50px',
    color: '#363557',
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

interface IProps{
  items: any[],
  handlerItem: (id: number | null) => void,
  checkedItem: number | null,
  mainTitle: string
}

const NewsSlider:FC<IProps> = ({ items, checkedItem, handlerItem, mainTitle }) => {
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
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
      <Slider
        {...settings}
        style={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Box
          className={classes.topic}
          sx={{
            borderRadius: '50px',
            backgroundColor: !checkedItem ? '#363557 !important' : 'transparent',
          }}
          onClick={() => handlerItem(null)}
        >
          <Typography
            className={classes.topicText}
            sx={{
              color: !checkedItem ? 'white!important' : 'black',
            }}
          >
            {mainTitle}
          </Typography>
        </Box>
        {items.map((item) => (
          <Box
            className={classes.topic}
            sx={{
              borderRadius: '50px',
              backgroundColor: Number(checkedItem) === item.id ? '#363557 !important' : 'transparent',
            }}
            onClick={() => handlerItem(item.id)}
            key={item.id}
          >
            <Tooltip title={item.title}>
            <Typography
              className={classes.topicText}
              sx={{
                color: Number(checkedItem) === item.id ? 'white!important' : 'black',
              }}
            >
              {item.title.substring(0, 18)}{item.title.length >= 18 && '...'}
            </Typography>
            </Tooltip>
          </Box>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;

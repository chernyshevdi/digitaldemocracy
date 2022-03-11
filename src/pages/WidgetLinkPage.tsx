import type { FC } from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Box, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useFetchWidgetLinkData } from '../components/WidgetLink/hooks/useFetchWidgetLinkPage';
import { widgetLinkSelector } from '../slices/widgetLinkSlice';
import WidgetLinkPageContent from '../components/WidgetLink/WidgetLinkPageContent/WidgetLinkPageContent';
// import { BackButton } from '../components/BackButton/BackButton';

interface MatchParamsI {
  id: string;
}

interface Props extends RouteComponentProps<MatchParamsI> {}

const WidgetLinkPage: FC<Props> = () => {
  const { fetch } = useFetchWidgetLinkData();

  useEffect(() => {
    fetch();
  }, []);
  const data = useSelector(widgetLinkSelector.getData());

  return (
    <Box>
      <Container maxWidth="lg">
        <WidgetLinkPageContent
          widgetTitle={data?.widgetTitle}
          newsTopics={data?.newsTopics}
          news={data?.news}
          isMorePages={data?.isMorePages}
        />
      </Container>
    </Box>
  );
};

export default WidgetLinkPage;

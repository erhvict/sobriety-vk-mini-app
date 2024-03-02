import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { Div, NavIdProps, Panel } from '@vkontakte/vkui';
import { FC } from 'react';
import { images } from '../assets/blobImage';
import MotivationBlock from '../components/MotivationBlock/MotivationBlock';
import Timer from '../components/Timer/Timer';

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

bridge
  .send('VKWebAppShowSlidesSheet', {
    slides: [
      // {
      //   media: {
      //     blob: 'data:image/png;base64,[IMAGE_DATA]',
      //     type: 'image',
      //   },
      //   title: 'Привет!',
      //   subtitle:
      //     'Рады, что ты решил отказаться от алкоголя. Мы тебе с этим поможем! Но перед этим, хотели бы тебе рассказать самое главное.',
      // },
      {
        media: {
          blob: `data:image/png;base64,${images.blob2}`,
          type: 'image',
        },
        title: 'Привет!',
        subtitle: 'Рады тебя видеть! Это круто, что ты решил отказаться от алкоголя!',
      },
    ],
  })
  .catch((error) => {
    console.log(error);
  });

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  // const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <Div>
        <Timer />
        <MotivationBlock />
      </Div>
    </Panel>
  );
};

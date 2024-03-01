import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { FC } from 'react';
import MotivationBlock from '../MotivationBlock/MotivationBlock';

import './Timer.css';

const Timer: FC = () => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <div className="timer-container" onClick={() => routeNavigator.showModal('addAlcho')}>
        <div className="text-container">
          <p className="timer-text">30 дней</p>
          <p className="timer-text">15 часов</p>
          <p className="timer-text">36 минут</p>
        </div>
      </div>
      <MotivationBlock />
    </>
  );
};

export default Timer;

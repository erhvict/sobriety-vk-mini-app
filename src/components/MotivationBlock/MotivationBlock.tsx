import { Div } from '@vkontakte/vkui';
import { FC } from 'react';

import './MotivationBlock.css';

const MotivationBlock: FC = () => {
  return (
    <Div className="motivation-container">
      <p className="mt-6 px-4 text-center text-sm">
        Начните каждый день с решения оставить алкоголь позади.
      </p>
    </Div>
  );
};

export default MotivationBlock;

import { Div, Spinner } from '@vkontakte/vkui';
import { collection, getDocs } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { database } from '../../lib/firebase';

import './MotivationBlock.css';

const MotivationBlock: FC = () => {
  const [currentString, setCurrentString] = useState('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchNextItem = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'motivations'));
        const data: string[] = querySnapshot.docs.map((doc) => doc.data().phrase); // Преобразуем snapshot в массив строк

        if (data.length > 0) {
          // Вычисляем порядковый номер дня от начала последовательности
          const startDate: Date = new Date('2024-01-01'); // Предполагаем, что начали собирать данные с 1 января 2024 года
          const today: Date = new Date();
          const diffTime: number = Math.abs(today.getTime() - startDate.getTime());
          const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const index: number = diffDays % data.length;
          setCurrentString(data[index]); // Устанавливаем текущий элемент на основе порядкового номера дня
          setLoaded(true);
        } else {
          console.log('No documents found!');
          setCurrentString(
            'Каждый отказ от алкоголя - это шаг в направлении здорового и счастливого будущего.',
          );
          setLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchNextItem();

    const intervalId: NodeJS.Timeout = setInterval(fetchNextItem, 24 * 60 * 60 * 1000); // Обновляем каждый день

    return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
  }, []);

  return <Div className="motivation-container">{!loaded ? <Spinner /> : `${currentString}`}</Div>;
};

export default MotivationBlock;

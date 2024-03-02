import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
  Button,
  DateInput,
  Div,
  FormItem,
  FormLayoutGroup,
  Input,
  ModalCard,
  ModalPageHeader,
  NavIdProps,
  Select,
} from '@vkontakte/vkui';
import { FC, useCallback, useState } from 'react';

const AddDateModal: FC<NavIdProps & { onClose: () => void }> = (props) => {
  const routeNavigator = useRouteNavigator();
  const [date, setDate] = useState(() => new Date());
  const [alchoType, setAlchoType] = useState('');
  const [volume, setVolume] = useState('');

  const onConfirmClick = useCallback(() => {
    routeNavigator.back();
  }, [routeNavigator]);

  // console.log(`Дата: ${value}. Алкоголь: ${alchoType}. Количество: ${volume}`);

  return (
    <ModalCard {...props} header={<ModalPageHeader>Добавить выпитое</ModalPageHeader>}>
      <Div>
        <FormLayoutGroup mode="vertical">
          <FormItem required top="Дата">
            <DateInput
              required
              value={date}
              onChange={(newValue) => setDate(newValue as Date)}
              enableTime={false}
              disablePast={false}
              disableFuture={true}
              disablePickers={true}
              showNeighboringMonth={true}
              size="m"
            />
          </FormItem>
          <FormItem required top="Напиток">
            <Select
              placeholder="Выберите напиток"
              value={alchoType}
              onChange={(e) => setAlchoType(e.target.value)}
              options={[
                {
                  label: 'Пиво',
                  value: 'beer',
                },
                {
                  label: 'Крепкое',
                  value: 'strong ',
                },
                {
                  label: 'Сидр',
                  value: 'cider',
                },
                {
                  label: 'Вино',
                  value: 'wine',
                },

                {
                  label: 'Шампанское',
                  value: 'champagne',
                },
                {
                  label: 'Коктейль',
                  value: 'cocktail',
                },
                {
                  label: 'Ликер',
                  value: 'liquor',
                },
                {
                  label: 'Другое',
                  value: 'other',
                },
              ]}
            />
          </FormItem>

          {!alchoType ? null : (
            <FormItem top="Количество выпитого, л">
              <Input
                type="number"
                placeholder="0.5"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />
            </FormItem>
          )}

          <FormItem>
            <Button disabled={date === undefined} onClick={onConfirmClick}>
              Добавить
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </Div>
    </ModalCard>
  );
};

export default AddDateModal;

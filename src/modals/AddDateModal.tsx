import {
  Calendar,
  Div,
  FormItem,
  FormLayoutGroup,
  ModalCard,
  ModalPageHeader,
  NavIdProps,
} from '@vkontakte/vkui';
import { FC, useState } from 'react';

const AddDateModal: FC<NavIdProps & { onClose: () => void }> = (props) => {
  const [value, setValue] = useState(() => new Date());

  return (
    <ModalCard {...props} header={<ModalPageHeader>Добавить выпитое</ModalPageHeader>}>
      <Div>
        <FormLayoutGroup mode="vertical">
          <FormItem>
            <Calendar
              value={value}
              onChange={setValue}
              enableTime={true}
              disablePast={false}
              disableFuture={true}
              disablePickers={true}
              showNeighboringMonth={true}
              size="m"
              listenDayChangesForUpdate={true}
            />
          </FormItem>
        </FormLayoutGroup>
      </Div>
    </ModalCard>
  );
};

export default AddDateModal;

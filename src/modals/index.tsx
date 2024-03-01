import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { ModalRoot } from '@vkontakte/vkui';
import React from 'react';
import AddDateModal from './AddDateModal';

const Modals: React.FC = () => {
  const { modal } = useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();

  return (
    <ModalRoot activeModal={modal}>
      <AddDateModal onClose={() => routeNavigator.hideModal()} id="addAlcho" />
    </ModalRoot>
  );
};

export { Modals };

import bridge, { BannerAdLayoutType, BannerAdLocation, UserInfo } from '@vkontakte/vk-bridge';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { ReactNode, useEffect, useState } from 'react';
import { handleUserRequest } from './api/makeRequest';
import { Modals } from './modals';

import { Home } from './pages';
import { DEFAULT_VIEW_PANELS } from './routes';

bridge
  .send('VKWebAppShowBannerAd', {
    banner_location: BannerAdLocation.BOTTOM,
    layout_type: BannerAdLayoutType.RESIZE,
  })
  .catch((error) => {
    console.log(error);
  });

export const App = () => {
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  useEffect(() => {
    handleUserRequest(fetchedUser)
      .then(() => console.log('Обработка запроса завершена'))
      .catch((error) => console.error('Ошибка при обработке запроса:', error));
  }, [fetchedUser]);

  return (
    <SplitLayout modal={<Modals />} popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

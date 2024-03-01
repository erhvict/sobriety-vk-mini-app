import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { ScreenSpinner, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { ReactNode, useEffect, useState } from 'react';
import { Modals } from './modals';

import { Home } from './pages';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={<Modals />}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={fetchedUser} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

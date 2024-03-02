import bridge, { BannerAdLayoutType, BannerAdLocation } from '@vkontakte/vk-bridge';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import { Modals } from './modals';

import { Home } from './pages';
import { DEFAULT_VIEW_PANELS } from './routes';

bridge
  .send('VKWebAppShowBannerAd', {
    banner_location: BannerAdLocation.BOTTOM,
    layout_type: BannerAdLayoutType.RESIZE,
  })
  .then((data) => {
    if (data.result) {
      console.log('Реклама появилась');
    }
  })
  .catch((error) => {
    console.log(error);
  });

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  // const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  // const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);

  // useEffect(() => {
  //   async function fetchData() {
  //     const user = await bridge.send('VKWebAppGetUserInfo');
  //     setUser(user);
  //     setPopout(null);
  //   }
  //   fetchData();
  // }, []);

  return (
    <SplitLayout modal={<Modals />}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

import { observer } from 'mobx-react-lite';
import store from '../store';

export const Home = observer(() => {
  return (
    <div className="p-6 backdrop-blur-2xl rounded-2xl">
      <h1>Hello</h1>
      {store.user && (
        <>
          <p>id: {store.user.id}</p>
          <p>name: {store.user.name}</p>
          <p>email: {store.user.email}</p>
        </>
      )}
    </div>
  );
});

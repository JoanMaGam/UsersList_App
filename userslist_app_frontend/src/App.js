import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import UsersList from './pages/UsersList';
import CreateUser from './pages/CreateUser';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UsersList />} />
          <Route path='/create' element={<CreateUser />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

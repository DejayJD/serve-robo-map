import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RobotMap } from './RobotMap';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RobotMap />
    </QueryClientProvider>
  );
}

export default App;

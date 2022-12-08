import './App.css';
import Characters from './components/Characters';
import { QueryClientProvider, QueryClient } from "react-query";

// so we can use useQuery on Characters.js we need to add the QueryClient 
// and wrap our app with QueryClientProvider
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h1>Rick and Morty</h1>
        {/* wrap our app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <Characters />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;

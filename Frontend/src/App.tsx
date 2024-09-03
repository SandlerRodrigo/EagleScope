import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoundList from "./pages/FoundList";
import ClientLogin from "./pages/Login";
import RoutePlanner from "./pages/RoutePlanner/RoutePlanner";
import ConfigFolder from "./pages/configFolder/configFolder.tsx"
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="bg-[#FAFAFA] min-h-screen w-screen text-black">
        <Routes>
          <Route path="*" element={<ClientLogin />} />
          <Route path="/list" element={<FoundList />} />
          <Route path="foundList" element={<RoutePlanner/>} />
          <Route path="configFolder" element={<ConfigFolder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
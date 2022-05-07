import UserOne from "./components/userOne";
import UserTwo from "./components/userTwo";
import UserThree from "./components/userThree";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Listagem de usuários</p>
      </header>
      <UserOne />
      <UserTwo />
      <UserThree />
    </div>
  );
}

export default App;

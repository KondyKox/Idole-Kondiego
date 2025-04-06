import TierList from "./components/TierList";

function App() {
  return (
    <main className="flex justify-center items-center flex-col p-2">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold p-4 text-gradient text-center">
        Tierlista Idoli Kondiego
      </h1>
      <TierList />
    </main>
  );
}

export default App;

import EmailMe from "./components/EmailMe";

import './App.css';

export default function App() {
    return (
        <div>
            <h1>João Iacillo</h1>
            <p className="red">O meu portfólio ainda está em desenvolvimento. Por favor, aguarde.</p>
            <EmailMe />
        </div>
    );
}

import "@/styles/pages/Error.scss";

const Error = () => {
    return (
        <main id="Error">
            <div className="container">
                <h2>Page perdue !</h2>
                <p>Il semble que la page que vous recherchez soit introuvable. Nous sommes désolés pour ce
                    désagrément. </p>
                <a href="" className="">Retour à l'accueil</a>
            </div>
        </main>
    );
};

export default Error;
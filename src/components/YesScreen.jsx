import Confetti from "react-confetti";

export default function FinalYes() {
    return (
        <>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={true}
                numberOfPieces={200}
            />
            <div className="text-center">
                <img
                    src="/final.jpg"
                    alt="Love"
                    className="mx-auto w-56 mb-6"
                />
                <h1 className="text-3xl font-bold text-white">
                    YAY!! I knew you’d say yes.
                    <br />
                    You were just pretending 💖😌
                </h1>
            </div>
        </>
    );
}

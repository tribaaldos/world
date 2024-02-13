import { useControls } from 'leva';

const LevaFPS = ({ perfVisible }) => {
    console.log('perfVisible:', perfVisible);

    // Your LevaFPS component logic here
    // You can use the perfVisible prop here

    return null; // or your JSX content
};

const Leva = () => {
    const { perfVisible } = useControls({
        perfVisible: true,
        planeScale: { value: 1, min: 0, max: 5 }, // Cambia los valores min y max según tus necesidades

    });

    return (
        <>
            <LevaFPS perfVisible={perfVisible} />
        </>
    );
};

export default Leva;

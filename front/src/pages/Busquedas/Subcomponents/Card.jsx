import {useMemo} from "react";
import {
    ActionButton,
    CardActions,
    CardCompany,
    CardContainer,
    CardContent,
    CardTitle,
    ColorBar
} from "./StyledComponents.jsx";
import {Link} from "react-router-dom";
import {MoreVertical} from "lucide-react";

const Card = ({card, handleCardStatusChange}) => {

    const randomColor = useMemo(() => {
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };
        return getRandomColor();
    }, []); // Dependencias vacías para que se ejecute solo una vez

    return (
        <CardContainer key={card.id}>
            <ColorBar color={randomColor}/>
            <Link to={'/busquedas/' + card.uuid}>
                <CardContent>
                    <CardTitle>{card.name}</CardTitle>
                    <CardCompany>{card.description}</CardCompany>
                </CardContent>
                <CardActions>
                    <ActionButton
                        onClick={() => handleCardStatusChange(card.id, card.status === 'active' ? 'inactive' : 'active')}>
                        <MoreVertical size={20}/>
                    </ActionButton>
                </CardActions>
            </Link>
        </CardContainer>
    )
}

export default Card;
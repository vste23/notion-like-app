import './InnerCard.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {Draggable} from "react-beautiful-dnd";

import Editor from '../editor/Editor';
import {CardActions} from "@material-ui/core";

const InnerCard = ({id, index, text, setText}) => {
    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided) => (
                <Card className={'inner-card'}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                >
                    <CardContent className={'inner-content'}>
                        <Editor text={text} setText={setText} />
                        <CardActions className={'drag-icon'}>
                            <DragIndicatorIcon/>
                        </CardActions>
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
}

export default InnerCard;

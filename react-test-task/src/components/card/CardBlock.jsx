import './CardBlock.css';
import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardHeader, IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import {getBlocks, reorder} from '../../common/utils';
import InnerCard from "../inner-card/InnerCard";

const CardBlock = () => {
    const [blocks, setBlocks] = useState([getBlocks(1)]);

    const onDragEnd = (result) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd !== dInd) {
            return;
        }

        const items = reorder(blocks[sInd], source.index, destination.index);
        const newState = [...blocks];
        newState[sInd] = items;
        setBlocks(newState);
    }

    return (
        <Card>
            <CardHeader
                action={
                    <IconButton aria-label="settings"
                                onClick={() => setBlocks([[...blocks[0], ...getBlocks(1)]])}>
                        <AddIcon/>
                    </IconButton>
                }
                title="Add New Text Block"
            />
            <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                    {blocks.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {el.map((b, i) => <InnerCard key={b.id} id={b.id} index={i}/>)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </CardContent>
        </Card>
    );
}

export default CardBlock;

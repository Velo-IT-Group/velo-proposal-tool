'use client';
import React, { useEffect } from 'react';
import SectionListItem from './SectionListItem';
import { Draggable, Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { cn } from '@/lib/utils';

const SectionsList = ({
	sections,
}: {
	sections: Array<Section & { phases: Array<Phase & { tickets: Array<Ticket & { tasks: Array<Task> }> }> }>;
}) => {
	const getBackgroundColor = (snapshot: DroppableStateSnapshot): string => {
		// Giving isDraggingOver preference
		if (snapshot.isDraggingOver) {
			return 'bg-pink-50';
		}

		// If it is the home list but not dragging over
		if (snapshot.draggingFromThisWith) {
			return 'bg-blue-50';
		}

		// Otherwise use our default background
		return 'bg-transparent';
	};

	return (
		<Droppable droppableId='sections'>
			{(provided, snapshot) => (
				<div {...provided.droppableProps} ref={provided.innerRef} className={cn('space-y-4 rounded-xl h-full', getBackgroundColor(snapshot))}>
					{sections.map((section, index) => (
						<Draggable key={section.id} draggableId={section.id} index={index}>
							{(provided) => {
								return (
									<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
										<SectionListItem key={section.id} section={section} phases={section.phases} />
									</div>
								);
							}}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default SectionsList;
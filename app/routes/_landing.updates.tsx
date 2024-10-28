import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineHeading,
	TimelineItem,
	TimelineLine,
} from "@/components/ui/timeline";
import { timelineItems, type Update } from "@/lib/updates";

export default function Updates() {
	return (
		<Timeline positions="center" className="m-auto px-4 sm:px-6 lg:px-8 xl:max-w-[90rem]">
			{timelineItems.map((item: Update, index) => (
				<TimelineItem key={index} status={item.status ?? "default"}>
					{item.headings.map((heading, idx) => (
						<TimelineHeading
							key={idx}
							side={heading.side}
							variant={heading.variant}
							className={heading.className}
						>
							{heading.text}
						</TimelineHeading>
					))}
					<TimelineDot status={item.dotStatus} />
					<TimelineLine done={item.lineDone} />
					<TimelineContent side={item.content.side}>{item.content.text}</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}

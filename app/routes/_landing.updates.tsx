import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineHeading,
	TimelineItem,
	TimelineLine,
} from "@/components/ui/timeline";
import { type Update, timelineItems } from "@/lib/updates";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Updates() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		handleResize(); // Check initial window size
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Timeline positions={isMobile ? "left" : "center"} className="m-auto px-4 sm:px-6 lg:px-8 xl:max-w-[90rem]">
			{timelineItems.map((item: Update, index) => (
				<TimelineItem key={index} status={item.status ?? "default"}>
					{item.headings.map((heading, idx) => (
						<TimelineHeading
							key={idx}
							side={isMobile ? "right" : heading.side}
							variant={heading.variant}
							className={cn(heading.className, isMobile && idx > 0 && "hidden")}
						>
							{heading.text}
						</TimelineHeading>
					))}
					<TimelineDot status={item.dotStatus} />
					<TimelineLine done={item.lineDone} />
					<TimelineContent side={isMobile ? "right" : item.content.side}>{item.content.text}</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}

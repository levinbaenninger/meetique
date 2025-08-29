ALTER TABLE "agent" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "agent" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_agent" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_agent" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_user" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_user" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_agent" DROP COLUMN "message_order";--> statement-breakpoint
ALTER TABLE "meeting_chat_message_user" DROP COLUMN "message_order";
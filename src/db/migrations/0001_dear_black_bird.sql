CREATE TABLE "meeting_chat" (
	"id" text PRIMARY KEY NOT NULL,
	"meeting_id" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "meeting_chat_message_agent" (
	"id" text PRIMARY KEY NOT NULL,
	"meeting_chat_id" text NOT NULL,
	"agent_id" text,
	"message" text NOT NULL,
	"message_order" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "meeting_chat_message_user" (
	"id" text PRIMARY KEY NOT NULL,
	"meeting_chat_id" text NOT NULL,
	"user_id" text NOT NULL,
	"message" text NOT NULL,
	"message_order" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "meeting_chat" ADD CONSTRAINT "meeting_chat_meeting_id_meeting_id_fk" FOREIGN KEY ("meeting_id") REFERENCES "public"."meeting"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_chat" ADD CONSTRAINT "meeting_chat_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_agent" ADD CONSTRAINT "meeting_chat_message_agent_meeting_chat_id_meeting_chat_id_fk" FOREIGN KEY ("meeting_chat_id") REFERENCES "public"."meeting_chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_agent" ADD CONSTRAINT "meeting_chat_message_agent_agent_id_agent_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agent"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_user" ADD CONSTRAINT "meeting_chat_message_user_meeting_chat_id_meeting_chat_id_fk" FOREIGN KEY ("meeting_chat_id") REFERENCES "public"."meeting_chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "meeting_chat_message_user" ADD CONSTRAINT "meeting_chat_message_user_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
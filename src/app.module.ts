import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';
import { ContentModule } from './content/content.module';
import { GroupActivitiesModule } from './group-activities/group-activities.module';
import { CommunityModule } from './community/community.module';
import { ModerationModule } from './moderation/moderation.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UsersModule, InterestsModule, ContentModule, GroupActivitiesModule, CommunityModule, ModerationModule, NotificationsModule, PaymentsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

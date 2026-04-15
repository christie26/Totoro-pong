'use client';

import withAuth from '@/components/auth/withAuth';
import { VideoPage } from '@/components/VideoPage';

export default withAuth(VideoPage, 'video');

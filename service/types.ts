export interface RawTimelineEdge {
  node: Record<string, any>;
}

export interface RawTimelineMedia {
  count: number;
  edges: RawTimelineEdge[];
  page_info: { has_next_page: boolean; end_cursor: string | null };
}

export interface RawProfileUser {
  id: string;
  username: string;
  full_name?: string;
  biography?: string;
  edge_followed_by?: { count: number };
  edge_follow?: { count: number };
  edge_owner_to_timeline_media?: RawTimelineMedia;
  is_private?: boolean;
  is_verified?: boolean;
  is_business_account?: boolean;
  is_professional_account?: boolean;
  category_name?: string;
  external_url?: string;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
}

export interface ProfileInfoResponse {
  data?: { user?: RawProfileUser };
}

export interface ProfileData {
  id: string;
  username: string;
  fullName?: string;
  biography?: string;
  followerCount?: number;
  followingCount?: number;
  postsCount?: number;
  isPrivate?: boolean;
  isVerified?: boolean;
  isBusinessAccount?: boolean;
  isProfessionalAccount?: boolean;
  categoryName?: string;
  externalUrl?: string;
  profilePicUrl?: string;
  profilePicUrlHd?: string;
}

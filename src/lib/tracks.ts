export const SOUNDCLOUD_PROFILE_URL = "https://soundcloud.com/feelhighmusic";

export type Track = {
  id: string;
  soundcloudTrackId: number;
  title: string;
  artist: string;
  genre: string;
  publishedAt: string;
  durationMs: number;
  soundcloudUrl: string;
  cover: string;
};

export const tracks = [
  {
    id: "knocks",
    soundcloudTrackId: 2325342122,
    title: "Feel High - Knocks",
    artist: "Feel High",
    genre: "Deep House",
    publishedAt: "2026-05-22T02:22:52Z",
    durationMs: 479446,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/knocks`,
    cover: "https://i1.sndcdn.com/artworks-fXT5yEzGqMOiQkCH-d7AyzQ-large.jpg",
  },
  {
    id: "myownstorm",
    soundcloudTrackId: 2325340961,
    title: "Feel High - My Own Storm",
    artist: "Feel High",
    genre: "Techno",
    publishedAt: "2026-05-22T02:18:43Z",
    durationMs: 263526,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/myownstorm`,
    cover: "https://i1.sndcdn.com/artworks-A36kD4Eq8zIBAU0H-lsKBzA-large.png",
  },
  {
    id: "negronigroove",
    soundcloudTrackId: 2325339788,
    title: "Feel High - Negroni Groove",
    artist: "Feel High",
    genre: "Techno",
    publishedAt: "2026-05-22T02:14:01Z",
    durationMs: 479446,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/negronigroove`,
    cover: "https://i1.sndcdn.com/artworks-AyGzLkzSui4rP2Rz-wZFdYg-large.png",
  },
  {
    id: "shadows",
    soundcloudTrackId: 2325338393,
    title: "Feel High - Shadows",
    artist: "Feel High",
    genre: "Techno",
    publishedAt: "2026-05-22T02:08:59Z",
    durationMs: 232246,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/shadows`,
    cover: "https://i1.sndcdn.com/artworks-a4q5am6uUHf3abKN-6zd3uA-large.png",
  },
  {
    id: "speakeasy",
    soundcloudTrackId: 2325337589,
    title: "Feel High - Speakeasy",
    artist: "Feel High",
    genre: "Techno",
    publishedAt: "2026-05-22T02:05:47Z",
    durationMs: 344246,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/speakeasy`,
    cover: "https://i1.sndcdn.com/artworks-PmybpERVRO9Jpbhz-oj3lSA-large.png",
  },
  {
    id: "superationofus",
    soundcloudTrackId: 2325319052,
    title: "Feel High, Diego D'Bear - Superation of Us",
    artist: "Feel High, Diego D'Bear",
    genre: "Electronic",
    publishedAt: "2026-05-22T01:30:20Z",
    durationMs: 188326,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/superationofus`,
    cover: "https://i1.sndcdn.com/artworks-ANK7WZw8pjkZiEwq-BsbaOQ-large.jpg",
  },
  {
    id: "descaso",
    soundcloudTrackId: 2325316406,
    title: "Feel High - Descaso",
    artist: "Feel High",
    genre: "Melodic House",
    publishedAt: "2026-05-22T01:19:56Z",
    durationMs: 160446,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/descaso`,
    cover: "https://i1.sndcdn.com/artworks-cN3KDvvRyZDhijyJ-13wzTQ-large.jpg",
  },
  {
    id: "feellingsunrise",
    soundcloudTrackId: 2325315929,
    title: "Feel High - Feeling Sunrise",
    artist: "Feel High",
    genre: "House",
    publishedAt: "2026-05-22T01:18:02Z",
    durationMs: 178446,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/feellingsunrise`,
    cover: "https://i1.sndcdn.com/artworks-fbZhMuz4AZzBNuPx-zlNf0w-large.png",
  },
  {
    id: "chaofurioso",
    soundcloudTrackId: 2325315269,
    title: "Feel High - Chão Furioso",
    artist: "Feel High",
    genre: "Melodic House",
    publishedAt: "2026-05-22T01:15:32Z",
    durationMs: 230046,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/chaofurioso`,
    cover: "https://i1.sndcdn.com/artworks-8nzwMRVYBNCwItxH-lhb5Aw-large.png",
  },
  {
    id: "feel-high-boss-groove",
    soundcloudTrackId: 2325312896,
    title: "Feel High - Boss Groove",
    artist: "Feel High",
    genre: "Techno",
    publishedAt: "2026-05-22T01:07:04Z",
    durationMs: 227286,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/feel-high-boss-groove`,
    cover: "https://i1.sndcdn.com/artworks-rWbvEeljFRnGTaq8-FI0OTQ-large.jpg",
  },
  {
    id: "westdream",
    soundcloudTrackId: 2325311891,
    title: "Feel High - West Dream",
    artist: "Feel High",
    genre: "House",
    publishedAt: "2026-05-22T01:03:04Z",
    durationMs: 153286,
    soundcloudUrl: `${SOUNDCLOUD_PROFILE_URL}/westdream`,
    cover: "https://i1.sndcdn.com/artworks-UE8L6yVuV8SWLi09-NgYBTQ-large.jpg",
  },
] as const satisfies readonly Track[];

export type TrackUrl = (typeof tracks)[number]["soundcloudUrl"];

export function getTrackSubtitle(track: Track) {
  return `${track.genre} · ${new Date(track.publishedAt).getUTCFullYear()}`;
}

export class VideoContent {
    username: string;
    id: string;
    videoFile: string | File;
    title:string;
    description:string;
    created_at:string;
    updated_at:string;
    uploadedImageFile: string | File | undefined = undefined;

    constructor(obj?: any) {
        this.username = obj?.username ?? '';
        this.id = obj?.uid ?? '';
        this.videoFile = obj?.videoFile ?? '';
        this.title = obj?.title ?? '';
        this.description = obj?.description ?? '';
        this.created_at = obj?.created_at ?? '';
        this.updated_at = obj?.updated_at ?? '';
        this.uploadedImageFile = obj?.uploadedImageFile ?? '';
    }

    public toJson() {
        return {
            username: this.username,
            uid: this.id,
            videoFile: this.videoFile,
            id: this.id,
            title: this.title,
            description: this.description,
            updated_at: this.updated_at,
            uploadedImageFile: this.uploadedImageFile,
        };
    }
}
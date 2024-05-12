export class VideoContent {
    username: string;
    id: string;
    videoFile: string | File;
    title:string;
    description:string;
    created_at:string;
    updated_at:string;
    video_imgs: string | File | undefined = undefined;
    view_count:number;
    
    constructor(obj?: any) {
        this.username = obj?.username ?? '';
        this.id = obj?.uid ?? '';
        this.videoFile = obj?.videoFile ?? '';
        this.title = obj?.title ?? '';
        this.description = obj?.description ?? '';
        this.created_at = obj?.created_at ?? '';
        this.updated_at = obj?.updated_at ?? '';
        this.video_imgs = obj?.uploadedImageFile ?? '';
        this.view_count = obj?.view_count ?? '';
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
            video_imgs: this.video_imgs,
            view_count: this.view_count,
            created_at:this.created_at,
        };
    }
}
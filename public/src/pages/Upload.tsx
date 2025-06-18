
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload as UploadIcon, FileText, Image, Video, File } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { toast } from "@/hooks/use-toast";

const Upload = () => {
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    tags: ""
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "上传成功",
      description: "课程内容已成功上传到系统",
    });

    // 重置表单
    setUploadData({
      title: "",
      description: "",
      category: "",
      level: "",
      tags: ""
    });
    setFiles([]);
    setIsUploading(false);
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (type.includes('text') || type.includes('document')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => window.location.href = '/login'}
        onRegisterClick={() => window.location.href = '/register'}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">上传课程内容</h1>
            <p className="text-muted-foreground">
              上传您的课程资料，包括视频、图片、文档等内容
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
                <CardDescription>
                  填写课程的基本信息
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">课程标题</Label>
                  <Input
                    id="title"
                    placeholder="请输入课程标题"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">课程描述</Label>
                  <Textarea
                    id="description"
                    placeholder="请输入课程的详细描述..."
                    value={uploadData.description}
                    onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">课程分类</Label>
                    <Select value={uploadData.category} onValueChange={(value) => setUploadData({...uploadData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">前端开发</SelectItem>
                        <SelectItem value="backend">后端开发</SelectItem>
                        <SelectItem value="mobile">移动开发</SelectItem>
                        <SelectItem value="data">数据科学</SelectItem>
                        <SelectItem value="ai">人工智能</SelectItem>
                        <SelectItem value="design">设计</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">难度等级</Label>
                    <Select value={uploadData.level} onValueChange={(value) => setUploadData({...uploadData, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择难度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">初级</SelectItem>
                        <SelectItem value="intermediate">中级</SelectItem>
                        <SelectItem value="advanced">高级</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">标签</Label>
                  <Input
                    id="tags"
                    placeholder="请输入标签，用逗号分隔"
                    value={uploadData.tags}
                    onChange={(e) => setUploadData({...uploadData, tags: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 文件上传 */}
            <Card>
              <CardHeader>
                <CardTitle>上传文件</CardTitle>
                <CardDescription>
                  支持上传视频、图片、文档等多种格式的文件
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 文件选择区域 */}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">拖拽文件到此处或点击选择</p>
                      <p className="text-sm text-muted-foreground">
                        支持 MP4, AVI, PDF, DOC, JPG, PNG 等格式
                      </p>
                    </div>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                      accept="video/*,image/*,.pdf,.doc,.docx,.ppt,.pptx"
                    />
                    <Label htmlFor="file-upload">
                      <Button type="button" variant="outline" className="mt-4" asChild>
                        <span>选择文件</span>
                      </Button>
                    </Label>
                  </div>

                  {/* 已选择的文件列表 */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">已选择的文件：</h4>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file)}
                              <div>
                                <div className="font-medium">{file.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setFiles(files.filter((_, i) => i !== index))}
                            >
                              移除
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 上传按钮 */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                保存草稿
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "上传中..." : "发布课程"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Upload;

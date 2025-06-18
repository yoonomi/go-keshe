// Final Project - 前端JavaScript文件

// API基础URL
const API_BASE_URL = '/api/v1';

// 工具函数
const utils = {
    // 发送HTTP请求
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    },

    // GET请求
    async get(endpoint) {
        return this.request(`${API_BASE_URL}${endpoint}`);
    },

    // POST请求
    async post(endpoint, data) {
        return this.request(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // 显示消息
    showMessage(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
};

// 健康检查
const healthCheck = {
    async check() {
        try {
            const response = await utils.get('/health');
            console.log('Health check:', response);
            return response;
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    }
};

// DOM加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('Final Project App Initialized');
    
    // 检查服务健康状态
    healthCheck.check().catch(() => {
        console.log('Service health check failed');
    });
});

// 导出工具函数供全局使用
window.FinalProject = {
    utils,
    healthCheck
}; 
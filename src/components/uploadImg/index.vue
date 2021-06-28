<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="config.action"
      :data="data.uploadKey"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="data.image" :src="data.image" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { QiniuToKen } from "@/api/common";
import {
  reactive,
  ref,
  watch,
  onMounted,
  onActivated,
} from "@vue/composition-api";

export default {
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, { emit, root }) {
    const data = reactive({
      image: "",
      uploadKey: {
        token: "",
        key: "",
      },
    });
    /**
     * 获取七牛云token
     */
    const getQiNiuToken = () => {
      let params = {
        accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
        secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
        buckety: "webjshtml",
      };
      QiniuToKen(params).then((res) => {
        console.log(res);
        if (res.resCode == 0) {
          data.uploadKey.token = res.data.token;
          console.log(data);
        }
      });
    };
    /**
     * 图片上传钩子
     */
    const handleAvatarSuccess = (res, file) => {
      let image = `${root.$store.getters["common/qiniuUrl"]}${res.key}`;
      data.image = image;
      emit("update:imgUrl", image);
      console.log(res);
      // this.imageUrl = URL.createObjectURL(file.raw);
    };
    const beforeAvatarUpload = (file) => {
        console.log(file)
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.uploadKey.key = key;
      return isJPG && isLt2M;
    };
    watch(
      () => props.imgUrl,
      (value) => {
        data.image = value;
      }
    );
    onMounted(() => {
      getQiNiuToken();
    });
    return {
      data,
      handleAvatarSuccess,
      beforeAvatarUpload,
      getQiNiuToken,
    };
  },
};
</script>

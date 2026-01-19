import React from "react";
import { Show, SimpleShowLayout, TextField, EmailField } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type DetailItemProps = {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
};

const DetailItem = ({ icon: Icon, label, children }: DetailItemProps) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Box mr={2}>
      <Icon />
    </Box>
    <Typography variant="body1">
      <strong>{label}:</strong> {children}
    </Typography>
  </Box>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Box ml={2}>
              <Typography variant="h4" component="h1">
                ユーザー詳細
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                詳細情報と連絡先
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DetailItem icon={PersonIcon} label="ID">
                <TextField source="id" />
              </DetailItem>
              <DetailItem icon={PersonIcon} label="名前">
                <TextField source="name" />
              </DetailItem>
              <DetailItem icon={PersonIcon} label="ユーザー名">
                <TextField source="username" />
              </DetailItem>
              <DetailItem icon={MailIcon} label="メール">
                <EmailField source="email" />
              </DetailItem>
              <DetailItem icon={PhoneIcon} label="電話番号">
                <TextField source="phone" />
              </DetailItem>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem icon={HomeIcon} label="住所">
                <TextField source="address.street" />
              </DetailItem>
              <DetailItem icon={HomeIcon} label="市町村">
                <TextField source="address.city" />
              </DetailItem>
              <DetailItem icon={HomeIcon} label="郵便番号">
                <TextField source="address.zipcode" />
              </DetailItem>
              <DetailItem icon={LanguageIcon} label="ウェブサイト">
                <TextField source="website" />
              </DetailItem>
              <DetailItem icon={BusinessIcon} label="会社名">
                <TextField source="company.name" />
              </DetailItem>
              <DetailItem icon={WorkIcon} label="キャッチフレーズ">
                <TextField source="company.catchPhrase" />
              </DetailItem>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 3, mb: 2 }} />
          <Box>
            <Typography variant="h6" gutterBottom>
              その他の情報
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DetailItem icon={WorkIcon} label="ビジネス">
                  <TextField source="company.bs" />
                </DetailItem>
                <DetailItem icon={HomeIcon} label="緯度">
                  <TextField source="address.geo.lat" />
                </DetailItem>
                <DetailItem icon={HomeIcon} label="経度">
                  <TextField source="address.geo.lng" />
                </DetailItem>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </SimpleShowLayout>
  </Show>
);

USE [mail]
GO
/****** Object:  Table [dbo].[用户]    Script Date: 11/30/2017 21:57:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[用户](
	[用户名] [varchar](50) NOT NULL,
	[邮箱] [varchar](50) NOT NULL,
	[密码] [int] NOT NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO

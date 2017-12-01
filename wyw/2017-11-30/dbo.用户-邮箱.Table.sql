USE [mail]
GO
/****** Object:  Table [dbo].[用户-邮箱]    Script Date: 11/30/2017 21:57:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[用户-邮箱](
	[用户名] [nchar](10) NOT NULL,
	[邮箱] [nchar](10) NOT NULL
) ON [PRIMARY]
GO

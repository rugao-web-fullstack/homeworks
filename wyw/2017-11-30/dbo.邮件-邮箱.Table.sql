USE [mail]
GO
/****** Object:  Table [dbo].[邮件-邮箱]    Script Date: 11/30/2017 21:57:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[邮件-邮箱](
	[邮件id] [int] NOT NULL,
	[收件人邮箱] [nchar](10) NOT NULL
) ON [PRIMARY]
GO
